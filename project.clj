(defn cljs-home [path]
  (if-let [home (get (System/getenv) "CLOJURESCRIPT_HOME")]
    (str home path)
    (throw (Exception. "You must set the $CLOJURESCRIPT_HOME variable!"))))
    
(defproject picturejs "0.0.1-SNAPSHOT"
  :description "ClojureScript implementing SICP Picture Language"
  :dependencies [[org.clojure/clojure "1.4.0"]]
  :plugins [[lein-cljsbuild "0.2.9"]]
  :cljsbuild {
      :builds [{:source-path "src-cljs"
                :compiler {:output-to "main.js"
                           :optimizations :whitespace
                           :externs ["libs/d3/d3.js"]
                           :pretty-print true}}]})