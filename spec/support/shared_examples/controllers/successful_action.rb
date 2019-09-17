RSpec.shared_examples 'a successful action' do
  it { is_expected.to have_http_status(:ok) }
end
