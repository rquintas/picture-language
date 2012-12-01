(defproject picturejs "0.0.1-SNAPSHOT"
  :description "ClojureScript implementing SICP Picture Language"
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [org.clojure/clojurescript "0.0-1450"]
                 [org.mozilla/rhino "1.7R3"]
                 [com.google.javascript/closure-compiler "r2079"]
                 [org.clojure/google-closure-library "0.0-1376-2"]]
  :plugins [[lein-cljsbuild "0.2.9"]]
  :cljsbuild {
      :builds [{:source-path "src/cljs"
                :compiler {:output-to "main.js"
                           :optimizations :whitespace
                           :externs ["libs/d3/d3.js"]
                           :pretty-print true}}]})