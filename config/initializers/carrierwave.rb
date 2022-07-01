# frozen_string_literal: true

if Rails.env.test?
  CarrierWave::Uploader::Base.descendants.each do |klass|
    next if klass.anonymous?

    klass.class_eval do
      def cache_dir
        "#{Rails.root}/spec/support/uploads/tmp"
      end

      def store_dir
        "#{Rails.root}/spec/support/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
      end
    end
  end
end

require 'fog/aws'

CarrierWave.configure do |config|
  if Rails.env.staging? || Rails.env.production?
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV.fetch('S3_KEY', nil),
      aws_secret_access_key: ENV.fetch('S3_SECRET', nil),
      region: 'eu-north-1'
    }
    config.fog_directory = ENV.fetch('S3_BUCKET_NAME', nil)
    config.storage = :fog
  else
    config.storage = :file
    config.enable_processing = Rails.env.development?
  end
end
