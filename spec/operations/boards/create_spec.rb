# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::Create do
  subject { described_class.new(user).call(params) }
  let_it_be(:user) { create(:user) }
  let_it_be(:permission) { create(:permission, identifier: Permission::MASTER_CREATOR_ID) }
  let(:params) { attributes_for(:board) }

  it 'adds user as a membership' do
    expect { subject }.to change { user.boards.count }.by(1)
  end

  it 'adds permission to user' do
    expect { subject }.to change(user.board_permissions, :count).by(1)
  end

  it 'returns a board' do
    expect(subject.value!.title).to eq(params[:title])
  end
end
