# frozen_string_literal: true

RSpec.shared_examples :controllers_redirect do
  it { is_expected.to have_http_status(:redirect) }
  it { is_expected.to redirect_to(path) }
end
