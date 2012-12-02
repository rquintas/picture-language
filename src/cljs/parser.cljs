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
                (apply str (butlast (walk (pop! stack) 0 groupPrefix)))
                (doseq []
                    (evalFunction (last tok) stack)
                    (recur (butlast tok)))))))
  
(defn walk [l v prefix]
  (if (and (list? l) (not (empty? l)))
    (let [a (walk (first l) v prefix)
          v2 (last a)
          b (walk (rest l) v2 prefix)]
		(concat (butlast a) b))
    (if (empty? l)
      (list "" v)
      (if (> (.indexOf (str l) "%G%") -1)
          (list (string/replace (str l) "%G%" (str "'" prefix v "'")) (inc v))
          (list (str l) v)))))
          
(defn numberGroups [sentence]
    (loop [s sentence]
        (let [idx (.indexOf s "%G%")]
            (if (> idx -1)
                (recur (string/replace s "%G%" (str "'" prefix idx "'")))
                sentence))))
        
                             
(defn evaluate [tok stack]
    (cond (= "wave" tok) (push! stack "picture.segments__GT_painter(picture.wave_segments,%G%)")
          (= "squash-inwards" tok) (let [a (pop! stack)]
                              (push! stack (list "picture.squash_inwards(" a ",%G%)")))
          (= "rotate90" tok) (let [a (pop! stack)]
                              (push! stack (list "picture.rotate90(" a ",%G%)")))
          (= "flip-vert" tok) (let [a (pop! stack)]
                              (push! stack (list "picture.flip_vert(" a ",%G%)")))
          (= "shrink-to-upper-right" tok) (let [a (pop! stack)]
                              (push! stack (list "picture.shrink_to_upper_right(" a ",%G%)")))
          (= "beside" tok) (let [a (pop! stack)
                                 b (pop! stack)]
                            (push! stack (list "picture.beside(" a "," b ",%G%)")))
          (= "below" tok) (let [a (pop! stack)
                                b (pop! stack)]
                            (push! stack (list "picture.below(" a "," b ",%G%)")))        
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