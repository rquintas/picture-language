(ns parser
  (:refer-clojure :exclude [replace])
  (:require [clojure.walk :as cwalk]
            [picture :as pic]
            [goog.string :as gstring]
            [goog.string.StringBuffer :as gstringbuf]
            [clojure.browser.repl :as repl]))

(repl/connect "http://localhost:9000/repl")

(defn pop! [stack]
  (let [first (first @stack)]
    (swap! stack pop)
    first))

(defn push! [stack item]
  (swap! stack conj item))

(defn replace
"Replaces all instance of match with replacement in s.
 match/replacement can be:

 string / string
 pattern / (string or function of match)."
    [s match replacement]
    (cond (string? match)
          (.replace s (js/RegExp. (gstring/regExpEscape match) "g") replacement)
          (.hasOwnProperty match "source")
          (.replace s (js/RegExp. (.-source match) "g") replacement)
          :else (throw (str "Invalid match arg: " match))))

(defn eval-tree [tree]
    1)

(defn ^:export parse [n]
    (let [stack (atom '())
          tokens (.split (replace (replace n "(" " LPAREN ") ")" " RPAREN ") #"\s")]
        (loop [tok tokens]
            (if (empty? tok)
                (cwalk eval identity (pop! stack))
                (doseq []
                    (evaluate (last tok) stack)
                    (recur (butlast tok)))))))

(defn ^:export parse2 [n]
    (let [stack (atom '())
          tokens (.split (replace (replace n "(" " LPAREN ") ")" " RPAREN ") #"\s")]
        (loop [tok tokens]
            (if (empty? tok)
                stack
                (doseq []
                    (evaluate (last tok) stack)
                    (recur (butlast tok)))))))

(defn ^:export parse3 [n]
    (let [stack (atom '())
          tokens (.split (replace (replace n "(" " LPAREN ") ")" " RPAREN ") #"\s")]
        tokens))
                
(defn evaluate [tok stack]
    (cond (= "wave" tok) (push! stack `(pic/segments->painter pic/wave))
          (= "rotate90" tok) (let [a (pop! stack)]
                              (push! stack (list 'pic/rotate90 a)))
          (= "beside" tok) (let [a (pop! stack)
                                 b (pop! stack)]
                            (push! stack (list 'pic/beside a b)))
          (= "below" tok) (let [a (pop! stack)
                                b (pop! stack)]
                            (push! stack (list 'pic/below a b)))        
           :else nil))