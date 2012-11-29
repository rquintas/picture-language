(ns picture)

(defn ^:export greet [n]
  (str "Cenas " n))

(defn ^:export make-vect [x y]
    (list x y))

(defn xcor-vect [v]
    (first v))

(defn ycor-vect [v]
    (last v))

(defn add-vect [v1 v2]
    (make-vect (+ (xcor-vect v1) (xcor-vect v2)) 
               (+ (ycor-vect v1) (ycor-vect v2))))

(defn sub-vect [v1 v2]
    (make-vect (- (xcor-vect v1) (xcor-vect v2)) 
               (- (ycor-vect v1) (ycor-vect v2))))

(defn scale-vect [s v]
    (make-vect (* s (xcor-vect v)) 
               (* s (ycor-vect v))))

(defn make-frame [origin edge1 edge2]
    (list origin (list edge1 edge2)))

(defn origin-frame [frame]
    (first frame))

(defn edge1-frame [frame]
    (first (last frame)))

(defn edge2-frame [frame]
    (last (last frame)))

(defn frame-coord-map [frame]
    (fn [v] 
        (add-vect 
            (origin-frame frame)
            (add-vect (scale-vect (xcor-vect v)
                                  (edge1-frame frame))
                      (scale-vect (ycor-vect v)
                                  (edge2-frame frame))))))


(defn make-segment [v1 v2]
    (list v1 v2))

(defn start-segment [segment]
    (first segment))

(defn end-segment [segment]
    (last segment))

(defn ^:export draw-line [v1 v2 graphics]
	(let [line (-> graphics (.append "svg:line"))]
	    (-> line (.attr "x1" (xcor-vect v1)) 
	             (.attr "y1" (ycor-vect v1))
	             (.attr "x2" (xcor-vect v2))
	             (.attr "y2" (ycor-vect v2))
	             (.style "stroke" "rgb(6,120,155)"))))

(defn draw-image [frame image graphics]
	(list 0))

(defn segments->painter [segment-list graphics]
    (fn [frame]
        (loop [segments segment-list]
            (if (empty? segments)
                segment-list
                (doseq []
                    (draw-line 
                        ((frame-coord-map frame) (start-segment (first segments)))
                        ((frame-coord-map frame) (end-segment (first segments)))
                        graphics)
                    (recur (rest segments)))))))

(defn image->painter [image graphics]
    (fn [frame]
        (draw-image frame image graphics)))

(defn outline-painter [graphics]
    (let [segment-list (list (make-segment (make-vect 0 0) (make-vect 0 1))
                             (make-segment (make-vect 0 0) (make-vect 1 0))
                             (make-segment (make-vect 1 1) (make-vect 0 1))
                             (make-segment (make-vect 1 0) (make-vect 1 1)))]
        (segments->painter segment-list graphics)))


(defn transform-painter [painter origin corner1 corner2]
    (fn [frame] 
        (let [m (frame-coord-map frame)
             new-origin (m origin)]
         (painter (make-frame new-origin (sub-vect (m corner1) new-origin)
                                         (sub-vect (m corner2) new-origin))))))

(defn flip-vert [painter]
    (transform-painter painter
        (make-vect 0 1)
        (make-vect 1 1)
        (make-vect 0 0)))

(defn shrink-to-upper-right [painter]
    (transform-painter painter
        (make-vect 0.5 0.5)
        (make-vect 1 0.5)
        (make-vect 0.5 1)))

(defn rotate90 [painter]
    (transform-painter painter
        (make-vect 1 0)
        (make-vect 1 1)
        (make-vect 0 0)))

(defn squash-inwards [painter]
    (transform-painter painter
        (make-vect 0 0)
        (make-vect 0.65 0.35)
        (make-vect 0.35 0.65)))

(defn beside [painter1 painter2]
    (let [split-point (make-vect 0.5 0.0)
          paint-left (transform-painter painter1 (make-vect 0 0)
                                                 split-point
                                                 (make-vect 0.0 1.0))
          paint-right (transform-painter painter2 split-point
                                                  (make-vect 1.0 0)
                                                  (make-vect 0.5 1.0))]
         (fn [frame]
             (paint-left frame)
             (paint-right frame))))

(defn below [painter1 painter2]
    (let [split-point (make-vect 0.0 0.5)
          paint-up (transform-painter painter1 split-point
                                                 (make-vect 1.0 0.5)
                                                 (make-vect 0.0 1.0))
          paint-down (transform-painter painter2  (make-vect 0.0 0.0)
                                                  (make-vect 1.0 0.0)
                                                  split-point)]
         (fn [frame]
             (paint-up frame)
             (paint-down frame))))

(def wave-segments
     (list
      (make-segment
       (make-vect 0.006 0.840)
       (make-vect 0.155 0.591))
      (make-segment
       (make-vect 0.006 0.635)
       (make-vect 0.155 0.392))
      (make-segment
       (make-vect 0.304 0.646)
       (make-vect 0.155 0.591))
      (make-segment
       (make-vect 0.298 0.591)
       (make-vect 0.155 0.392))
      (make-segment
       (make-vect 0.304 0.646)
       (make-vect 0.403 0.646))
      (make-segment
       (make-vect 0.298 0.591)
       (make-vect 0.354 0.492))
      (make-segment
       (make-vect 0.403 0.646)
       (make-vect 0.348 0.845))
      (make-segment
       (make-vect 0.354 0.492)
       (make-vect 0.249 0.000))
      (make-segment
       (make-vect 0.403 0.000)
       (make-vect 0.502 0.293))
      (make-segment
       (make-vect 0.502 0.293)
       (make-vect 0.602 0.000))
      (make-segment
       (make-vect 0.348 0.845)
       (make-vect 0.403 0.999))
      (make-segment
       (make-vect 0.602 0.999)
       (make-vect 0.652 0.845))
      (make-segment
       (make-vect 0.652 0.845)
       (make-vect 0.602 0.646))
      (make-segment
       (make-vect 0.602 0.646)
       (make-vect 0.751 0.646))
      (make-segment
       (make-vect 0.751 0.646)
       (make-vect 0.999 0.343))
      (make-segment
       (make-vect 0.751 0.000)
       (make-vect 0.597 0.442))
      (make-segment
       (make-vect 0.597 0.442)
       (make-vect 0.999 0.144))))