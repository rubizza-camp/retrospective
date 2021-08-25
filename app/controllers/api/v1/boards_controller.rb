# frozen_string_literal: true

module API
  module V1
    class BoardsController < API::V1::BaseController
      before_action except: %i[index] do
        @board = Board.find_by_slug!(params[:slug])
      end

      # app/graphql/queries/boards.rb
      def index
        authorize!

        boards = Board.includes(:cards).limit(10)

        render json: serialize_resource(boards)
      end

      # app/graphql/queries/board.rb
      def show
        authorize! @board

        render json: serialize_resource(@board)
      end

      def continue
        authorize! @board, to: :continue?

        result = Boards::Continue.new(@board, current_user).call
        if result.success?
          render json: serialize_resource(result.value!)
        else
          render_json_error(result.failure)
        end
      end

      def history
        authorize!

        boards = Boards::GetHistoryOfBoard.new(@board.id).call
        boards_by_date = boards.order(created_at: :desc)
                               .group_by { |record| record.created_at.strftime('%B, %Y') }

        render json: serialize_resource(boards_by_date)
      end

      def update
        authorize! @board, to: :update?

        old_column_names = @board.column_names
        if @board.update(board_params)
          result = Boards::RenameColumns.new(@board).call(old_column_names, @board.column_names)
          render json: serialize_resource(result.value!) if result.success?
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
        params.require(:board).permit(:title, :team_id, :email, :private, column_names: [])
      end
    end
  end
end
