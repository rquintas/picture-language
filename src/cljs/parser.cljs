(ns parser
  (:refer-clojure :exclude [replace])
  (:require [goog.string :as gstring]
            [goog.string.StringBuffer :as gstringbuf]))

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

(defn ^:export parse [n]
    (let [stack (atom '())
          tokens (.split (replace (replace n "(" " LPAREN ") ")" " RPAREN ") #"\s")]
        (loop [tok tokens]
            (if (empty? tok)
                (pop! stack)
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
    (cond (= "wave" tok) (push! stack "picture.segments__GT_painter(picture.wave_segments,lineGraph)")
          (= "rotate90" tok) (let [a (pop! stack)]
                              (push! stack (str "picture.rotate90(" a ")")))
          (= "beside" tok) (let [a (pop! stack)
                                 b (pop! stack)]
                            (push! stack (str "picture.beside(" a "," b ")")))
          (= "below" tok) (let [a (pop! stack)
                                b (pop! stack)]
                            (push! stack (str "picture.below(" a "," b ")")))        
           :else nil))