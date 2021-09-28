# frozen_string_literal: true

module API
  module V1
    class BoardsController < API::V1::BaseController
      before_action only: %i[show continue edit update destroy history] do
        @board = Board.find_by_slug!(params[:slug])
      end

      def my
        authorize!
        boards = Board.creator_boards(current_user)

        render json: boards, include_users: :limited
      end

      def participating
        authorize!
        boards = Board.member_boards(current_user) - Board.creator_boards(current_user)

        render json: boards, include_users: :limited
      end

      def show
        authorize! @board, to: :show?

        render json: @board, include_users: :all
      end

      def new
        @board = Board.new(title: Date.today.strftime('%d-%m-%Y'))
        authorize! @board, to: :new?

        render json: @board
      end

      def edit
        authorize! @board, to: :edit?

        render json: @board
      end

      def continue
        authorize! @board, to: :continue?

        result = Boards::Continue.new(@board, current_user).call
        if result.success?
          render json: result.value!
        else
          render_json_error(result.failure)
        end
      end

      def history
        authorize!

        boards = Boards::GetHistoryOfBoard.new(@board.id).call.order(created_at: :desc)

        render json: boards, include_users: :limited
      end

      def create
        authorize!

        result = Boards::Create.new(current_user).call(board_params)
        if result.success?
          render json: result.value!, status: 201
        else
          render_json_error(result.failure)
        end
      end

      def update
        authorize! @board, to: :update?

        old_column_names = @board.column_names
        if @board.update(board_params)
          result = Boards::RenameColumns.new(@board).call(old_column_names, @board.column_names)
          render json: result.value! if result.success?
        else
          render_json_error(@board.errors.full_messages)
        end
      end

      def destroy
        authorize! @board, to: :destroy?

        if @board.destroy
          head :no_content
        else
          render_json_error(@board.errors.full_messages)
        end
      end

      private

      def board_params
        params.require(:board).permit(:title, :private, column_names: [], column_emojis: [])
      end
    end
  end
end
