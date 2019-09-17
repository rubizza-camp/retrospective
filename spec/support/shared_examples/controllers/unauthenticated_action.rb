RSpec.shared_examples 'an unauthenticated action' do
  it { is_expected.to have_http_status(302) }
end
