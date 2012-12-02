(ns parser
  (:require [clojure.string :as string]))

(defn pop! [stack]
  (let [first (first @stack)]
    (swap! stack pop)
    first))

(defn push! [stack item]
  (swap! stack conj item))

(defn parse [n evalFunction groupPrefix]
    (let [stack (atom '())
          tokens (.split (string/replace (string/replace n "(" " LPAREN ") ")" " RPAREN ") #"\s")]
        (loop [tok tokens]
            (if (empty? tok)
                (numberGroups (apply str (pop! stack)) groupPrefix)
                (doseq []
                    (evalFunction (last tok) stack)
                    (recur (butlast tok)))))))
          
(defn numberGroups [sentence prefix]
    (loop [s sentence v 0]
        (let [idx (.indexOf s "%G%")]
            (if (> idx -1)
                (recur (string/replace-first s "%G%" (str "'" prefix v "'")) (inc v))
                s))))
        
                             
(defn evaluate [tok stack]
    (cond (= "wave" tok) (push! stack "picture.segments__GT_painter(%G%,picture.wave_segments)")
          (= "squash-inwards" tok) (let [a (pop! stack)]
                              (push! stack (list "picture.squash_inwards(%G%," a ")")))
          (= "rotate90" tok) (let [a (pop! stack)]
                              (push! stack (list "picture.rotate90(%G%," a ")")))
          (= "flip-vert" tok) (let [a (pop! stack)]
                              (push! stack (list "picture.flip_vert(%G%," a ")")))
          (= "shrink-to-upper-right" tok) (let [a (pop! stack)]
                              (push! stack (list "picture.shrink_to_upper_right(%G%," a ")")))
          (= "beside" tok) (let [a (pop! stack)
                                 b (pop! stack)]
                            (push! stack (list "picture.beside(%G%," a "," b ")")))
          (= "below" tok) (let [a (pop! stack)
                                b (pop! stack)]
                            (push! stack (list "picture.below(%G%," a "," b ")")))        
           :else nil))

(defn evaluateHTML [tok stack]
    (cond (= "wave" tok) (push! stack "<span id=%G%>wave</span>")
          (= "squash-inwards" tok) (let [a (pop! stack)]
                              (push! stack (list "<span id=%G%>squash-inwards</span> " a)))
          (= "rotate90" tok) (let [a (pop! stack)]
                              (push! stack (list "<span id=%G%>rotate90</span> " a)))
          (= "flip-vert" tok) (let [a (pop! stack)]
                              (push! stack (list "<span id=%G%>flip-vert</span> " a)))
          (= "shrink-to-upper-right" tok) (let [a (pop! stack)]
                              (push! stack (list "<span id=%G%>shrink-to-upper-right</span> " a)))
          (= "beside" tok) (let [a (pop! stack)
                                 b (pop! stack)]
                            (push! stack (list "<span id=%G%>beside</span> " a " " b)))
          (= "below" tok) (let [a (pop! stack)
                                b (pop! stack)]
                            (push! stack (list "<span id=%G%>below</span> " a " " b)))        
           :else nil))