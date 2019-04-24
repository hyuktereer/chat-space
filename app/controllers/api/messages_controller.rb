class Api::MessagesController < ApplicationController
  before_action :set_group

  def index
    @new_messages = @group.messages.where('id >?',params[:id]).includes(:user)
  end


  private
  def set_group
    @group =Group.find(params[:group_id])
  end
  

end