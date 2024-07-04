class ProductController < ApplicationController
  # /grocery
  def index
    # GET /grocery?favorite=1
    @favorite = params[:favorite]
    if @favorite.present? && @favorite == '1'
      @products = Product.where(favorite: '1')
    #GET /grocery
    else
      @products = Product.all
    end

    render json: @products
  end
  # /grocery/:id
  def update
    @product = Product.find(params[:id])
    @product.update(
      favorite: params[:favorite]
    )
    render json: @product
  end
end