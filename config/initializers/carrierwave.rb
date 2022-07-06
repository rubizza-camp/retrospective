# frozen_string_literal: true

CarrierWave.configure do |config|
  config.storage = :file
  config.enable_processing = !Rails.env.test?
  config.permissions = 0o600
  config.directory_permissions = 0o777

  config.asset_host = Rails.application.config.assets.host if Rails.env.development?

  if Rails.env.production?
    config.storage = :fog
    config.fog_credentials = {
      provider: 'AWS', # required
      aws_access_key_id: ENV.fetch('AWS_ACCESS_KEY_ID', nil), # required unless using use_iam_profile
      aws_secret_access_key: ENV.fetch('AWS_SECRET_ACCESS_KEY', nil), # required unless using use_iam_profile
      region: 'eu-central-1' # optional, defaults to 'us-east-1'
    }
    config.fog_directory = ENV.fetch('AWS_BUCKET_NAME', nil) # required
    config.fog_public    = false
    config.cache_dir     = "#{Rails.root}/tmp/uploads"         # To let CarrierWave work on Heroku
  end
end
