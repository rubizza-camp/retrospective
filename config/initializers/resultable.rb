# frozen_string_literal: true

module Resultable
  Result = Struct.new(:value, :error, :success?, keyword_init: true)
end
