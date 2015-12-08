json.total_count @search_results.count

json.results do
  json.array! @search_results.map(&:searchable) do |result|
    if result.class == User
      json.partial! "api/users/user", user: result
      json._type "User"
    else
      json.partial! "api/tags/tag", tag: result
      json._type "Tag"
    end
  end
end
