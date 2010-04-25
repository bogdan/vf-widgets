require 'yaml'


config = YAML.load(File.read("build.yml"))

task :default => :build

desc "Builds vf-widgets library"
task :build => ['build:doc', 'build:source']

namespace :build do
  desc "Build documentation"

  task :doc do
    doc = config['doc']
    exec(
    "#{doc['yuidoc']} #{config['src']} " + 
    "-p #{doc['parserdir']} " +
    "-o #{doc['dir']} " +
    "-t #{doc['template']} " +
    "-m #{config['name']} " +
    "-v #{config['version']} " +
    "-u #{doc['url']} " +
    ""

    )
       
  end # do

  desc "Build source code"
  task :source do
    build = File.new('vf-widgets.js', 'w')
    config["files"].each do |file|
      #TODO: implement compression
      build.write(File.read(file))
      build.write("\n\n")
    end
    build.close
  end # do

end # do
