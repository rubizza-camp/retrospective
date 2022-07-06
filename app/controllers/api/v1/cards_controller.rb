# frozen_string_literal: true

module API
  module V1
    class CardsController < API::V1::BaseController
      before_action only: %i[create update] do
        params.deep_transform_keys!(&:underscore)
      end

      before_action except: :create do
        @card = Card.find(params[:id])
        authorize! @card
      end

      def create
        board = Board.find_by!(slug: params[:board_slug])
        authorize! board, to: :create_cards?
        card = Boards::Cards::Create.new(current_user, board).call(card_params)

        if card.success?
          prepare_and_make_response(card)
        else
          render_json_error(card.errors.full_messages)
        end
      end

      def update
        if @card.update(card_params)
          prepare_and_make_response(@card)
        else
          render_json_error(@card.errors.full_messages)
        end
      end

      def destroy
        if @card.destroy
          prepare_and_make_response(@card)
        else
          render_json_error(@card.errors.full_messages)
        end
      end

      def like
        if @card.like!
          prepare_and_make_response(@card)
        else
          render_json_error(@card.errors.full_messages)
        end
      end

      private

      def card_params
        params.permit(:kind, :body)
      end

      def prepare_and_make_response(card)
        payload = serialize_resource(card)

        ActionCable.server.broadcast('card', payload)
        render json: card
      end
    end
  end
end
