class RenameMessageColumnToMessage < ActiveRecord::Migration[5.0]
  def change
    rename_column :messages, :message, :body
  end
end
