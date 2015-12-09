class Api::SearchController < ApplicationController

  def index
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .page(1).per(6)

    render 'index'
  end

end
