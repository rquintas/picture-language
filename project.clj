(defproject hellojs "0.0.1-SNAPSHOT"
  :description "D3 test library"
  :dependencies [[org.clojure/clojure "1.4.0"]]
  :plugins [[lein-cljsbuild "0.2.9"]]
  :cljsbuild {
      :builds [{:source-path "src-cljs"
                :compiler {:output-to "main.js"
                           :optimizations :whitespace
                           :externs ["d3/d3.js"]
                           :pretty-print true}}]})