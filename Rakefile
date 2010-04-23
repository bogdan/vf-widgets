require 'yaml'

task :default => :build

desc "Builds vf-widgets library"
task :build do
  config = YAML.load(File.read("build.yml"))
  build = File.new('vf-widgets.js', 'w')
  config["files"].each do |file|
    #TODO: implement compression
    build.write(File.read(file))
    build.write("\n\n")
  end
  build.close
end # do
