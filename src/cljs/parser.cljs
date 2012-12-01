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
                (apply str (butlast (walk (pop! stack) 0)))
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
  
(defn walk [l v]
  (if (and (list? l) (not (empty? l)))
    (let [a (walk (first l) v)
          v2 (last a)
          b (walk (rest l) v2)]
		(concat (butlast a) b))
    (if (empty? l)
      (list "" (inc v))
      (list (replace (str l) "%G%" (str v)) (inc v)))))

                
(defn evaluate [tok stack]
    (cond (= "wave" tok) (push! stack "picture.segments__GT_painter(picture.wave_segments,%G%)")
          (= "rotate90" tok) (let [a (pop! stack)]
                              (push! stack (list "picture.rotate90(" a ",%G%)")))
          (= "beside" tok) (let [a (pop! stack)
                                 b (pop! stack)]
                            (push! stack (list "picture.beside(" a "," b ",%G%)")))
          (= "below" tok) (let [a (pop! stack)
                                b (pop! stack)]
                            (push! stack (list "picture.below(" a "," b ",%G%)")))        
           :else nil))