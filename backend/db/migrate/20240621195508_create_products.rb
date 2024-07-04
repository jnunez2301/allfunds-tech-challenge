class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :image_url
      t.integer :stock
      t.string :productName
      t.integer :price
      t.string :productDescription
      t.string :favorite

      t.timestamps
    end
  end
end
