require 'sinatra'

set :bind, '0.0.0.0'
set :port, 3001
set :public_folder, Proc.new { File.join(root, "public") }

get '/' do
  erb :index
end

post '/update' do
  lat = params[:lat]
  lon = params[:lon]

  raw = %(<gpx creator="Xcode" version="1.1"><wpt lat="#{lat}" lon="#{lon}"><name>PokemonLocation</name></wpt></gpx>)
  File.open('PokemonLocation.gpx', 'w') do |f|
    f.puts raw
  end
  system('osascript click-event.scpt')
  'ok'
end
