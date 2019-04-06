class MessagesController < ApplicationController
  def index
    @message = Message.new
  end

  def create
    Message.create(message_params)
    move_to_index
  end

  private
  def  message_params
    params.require[:message].permit.params(:body)
  end
end
