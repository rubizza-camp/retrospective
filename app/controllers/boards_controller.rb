# frozen_string_literal: true

class BoardsController < ApplicationController
  layout 'board', only: :show

  before_action :set_board, only: %i[show continue edit update destroy history]
  skip_before_action :authenticate_user!, only: :show
  skip_verify_authorized only: :show

  def my
    authorize!

    @boards_by_date = Board.creator_boards(current_user)
                           .group_by { |record| record.created_at.strftime('%B, %Y') }
  end

  def participating
    authorize!

    @boards_by_date = (Board.member_boards(current_user) - Board.creator_boards(current_user))
                      .group_by { |record| record.created_at.strftime('%B, %Y') }
  end

  def history
    authorize!

    boards = Boards::GetHistoryOfBoard.new(@board.id).call
    @boards_by_date = boards.order(created_at: :desc)
                            .group_by { |record| record.created_at.strftime('%B, %Y') }
  end

  # rubocop:disable Metrics/AbcSize
  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Layout/LineLength
  def show
    authorize! @board
    @cards_by_type = @board.column_names.map do |column|
      [[column, ActiveModelSerializers::SerializableResource.new(@board.cards.where(kind: column)
        .includes(:author, comments: [:author]).order(created_at: :desc)).as_json]].to_h
    end.reduce({}, :merge).as_json
    @action_items = ActiveModelSerializers::SerializableResource.new(@board.action_items.order(created_at: :desc)).as_json
    @action_item = ActionItem.new(board_id: @board.id)
    @previous_action_items = if @board.previous_board&.action_items&.any?
                               ActiveModelSerializers::SerializableResource.new(@board.previous_board.action_items).as_json
                             end
    @previous_board_slug = @board.previous_board&.slug
    @users = ActiveModelSerializers::SerializableResource.new(User.find(@board.memberships.pluck(:user_id))).as_json
    # @data = RetrospectiveSchema.execute(INITIAL__QUERY)
  end
  # rubocop:enable Layout/LineLength
  # rubocop:enable Metrics/MethodLength
  # rubocop:enable Metrics/AbcSize

  def new
    authorize!
    @board = Board.new(title: Date.today.strftime('%d-%m-%Y'))
  end

  def edit
    authorize! @board
  end

  def create
    authorize!

    result = Boards::Create.new(current_user).call(board_params)
    if result.success?
      redirect_to result.value!, notice: 'Board was successfully created.'
    else
      flash[:alert] = result.failure
      render :new
    end
  end

  def update
    authorize! @board
    old_column_names = @board.column_names
    if @board.update(board_params)
      result = Boards::RenameColumns.new(@board).call(old_column_names, @board.column_names)
      if result.success?
        redirect_to edit_board_path(@board), notice: 'Board was successfully updated.'
      end
    else
      render :edit
    end
  end

  def destroy
    authorize! @board
    if @board.destroy
      redirect_to my_boards_path, notice: 'Board was successfully deleted.'
    else
      redirect_to my_boards_path, alert: @board.errors.full_messages.join(', ')
    end
  end

  def continue
    authorize! @board
    result = Boards::Continue.new(@board, current_user).call
    if result.success?
      redirect_to result.value!, notice: 'Board was successfully created.'
    else
      redirect_to my_boards_path, alert: result.failure
    end
  end

  private

  def board_params
    params.require(:board).permit(:title, :private, column_names: [], column_emojis: [])
  end

  def set_board
    @board = Board.find_by!(slug: params[:slug])
  end
end
