goog.provide('hello');
goog.require('cljs.core');
hello.greet = (function greet(n){
return [cljs.core.str("Cenas "),cljs.core.str(n)].join('');
});
goog.exportSymbol('hello.greet', hello.greet);
hello.make_vect = (function make_vect(x,y){
return cljs.core.list.call(null,x,y);
});
goog.exportSymbol('hello.make_vect', hello.make_vect);
hello.xcor_vect = (function xcor_vect(v){
return cljs.core.first.call(null,v);
});
hello.ycor_vect = (function ycor_vect(v){
return cljs.core.last.call(null,v);
});
hello.add_vect = (function add_vect(v1,v2){
return hello.make_vect.call(null,(hello.xcor_vect.call(null,v1) + hello.xcor_vect.call(null,v2)),(hello.ycor_vect.call(null,v1) + hello.ycor_vect.call(null,v2)));
});
hello.sub_vect = (function sub_vect(v1,v2){
return hello.make_vect.call(null,(hello.xcor_vect.call(null,v1) - hello.xcor_vect.call(null,v2)),(hello.ycor_vect.call(null,v1) - hello.ycor_vect.call(null,v2)));
});
hello.scale_vect = (function scale_vect(s,v){
return hello.make_vect.call(null,(s * hello.xcor_vect.call(null,v)),(s * hello.ycor_vect.call(null,v)));
});
hello.make_frame = (function make_frame(origin,edge1,edge2){
return cljs.core.list.call(null,origin,cljs.core.list.call(null,edge1,edge2));
});
hello.origin_frame = (function origin_frame(frame){
return cljs.core.first.call(null,frame);
});
hello.edge1_frame = (function edge1_frame(frame){
return cljs.core.first.call(null,cljs.core.last.call(null,frame));
});
hello.edge2_frame = (function edge2_frame(frame){
return cljs.core.last.call(null,cljs.core.last.call(null,frame));
});
hello.frame_coord_map = (function frame_coord_map(frame){
return (function (v){
return hello.add_vect.call(null,hello.origin_frame.call(null,frame),hello.add_vect.call(null,hello.scale_vect.call(null,hello.xcor_vect.call(null,v),hello.edge1_frame.call(null,frame)),hello.scale_vect.call(null,hello.ycor_vect.call(null,v),hello.edge2_frame.call(null,frame))));
});
});
hello.make_segment = (function make_segment(v1,v2){
return cljs.core.list.call(null,v1,v2);
});
hello.start_segment = (function start_segment(segment){
return cljs.core.first.call(null,segment);
});
hello.end_segment = (function end_segment(segment){
return cljs.core.last.call(null,segment);
});
hello.draw_line = (function draw_line(v1,v2,graphics){
var line = graphics.append("svg:line");
return line.attr("x1",hello.xcor_vect.call(null,v1)).attr("y1",hello.ycor_vect.call(null,v1)).attr("x2",hello.xcor_vect.call(null,v2)).attr("y2",hello.ycor_vect.call(null,v2)).style("stroke","rgb(6,120,155)");
});
goog.exportSymbol('hello.draw_line', hello.draw_line);
hello.draw_image = (function draw_image(frame,image,graphics){
return cljs.core.list.call(null,0);
});
hello.segments__GT_painter = (function segments__GT_painter(segment_list,graphics){
return (function (frame){
var segments = segment_list;
while(true){
if(cljs.core.empty_QMARK_.call(null,segments))
{return segment_list;
} else
{hello.draw_line.call(null,hello.frame_coord_map.call(null,frame).call(null,hello.start_segment.call(null,cljs.core.first.call(null,segments))),hello.frame_coord_map.call(null,frame).call(null,hello.end_segment.call(null,cljs.core.first.call(null,segments))),graphics);
{
var G__2821 = cljs.core.rest.call(null,segments);
segments = G__2821;
continue;
}
}
break;
}
});
});
hello.image__GT_painter = (function image__GT_painter(image,graphics){
return (function (frame){
return hello.draw_image.call(null,frame,image,graphics);
});
});
hello.outline_painter = (function outline_painter(graphics){
var segment_list = cljs.core.list.call(null,hello.make_segment.call(null,hello.make_vect.call(null,0,0),hello.make_vect.call(null,0,1)),hello.make_segment.call(null,hello.make_vect.call(null,0,0),hello.make_vect.call(null,1,0)),hello.make_segment.call(null,hello.make_vect.call(null,1,1),hello.make_vect.call(null,0,1)),hello.make_segment.call(null,hello.make_vect.call(null,1,0),hello.make_vect.call(null,1,1)));
return hello.segments__GT_painter.call(null,segment_list,graphics);
});
hello.transform_painter = (function transform_painter(painter,origin,corner1,corner2){
return (function (frame){
var m = hello.frame_coord_map.call(null,frame);
var new_origin = m.call(null,origin);
return painter.call(null,hello.make_frame.call(null,new_origin,hello.sub_vect.call(null,m.call(null,corner1),new_origin),hello.sub_vect.call(null,m.call(null,corner2),new_origin)));
});
});
hello.flip_vert = (function flip_vert(painter){
return hello.transform_painter.call(null,painter,hello.make_vect.call(null,0,1),hello.make_vect.call(null,1,1),hello.make_vect.call(null,0,0));
});
hello.shrink_to_upper_right = (function shrink_to_upper_right(painter){
return hello.transform_painter.call(null,painter,hello.make_vect.call(null,0.5,0.5),hello.make_vect.call(null,1,0.5),hello.make_vect.call(null,0.5,1));
});
hello.rotate90 = (function rotate90(painter){
return hello.transform_painter.call(null,painter,hello.make_vect.call(null,1,0),hello.make_vect.call(null,1,1),hello.make_vect.call(null,0,0));
});
hello.squash_inwards = (function squash_inwards(painter){
return hello.transform_painter.call(null,painter,hello.make_vect.call(null,0,0),hello.make_vect.call(null,0.65,0.35),hello.make_vect.call(null,0.35,0.65));
});
hello.beside = (function beside(painter1,painter2){
var split_point = hello.make_vect.call(null,0.5,0.0);
var paint_left = hello.transform_painter.call(null,painter1,hello.make_vect.call(null,0,0),split_point,hello.make_vect.call(null,0.0,1.0));
var paint_right = hello.transform_painter.call(null,painter2,split_point,hello.make_vect.call(null,1.0,0),hello.make_vect.call(null,0.5,1.0));
return (function (frame){
paint_left.call(null,frame);
return paint_right.call(null,frame);
});
});
hello.below = (function below(painter1,painter2){
var split_point = hello.make_vect.call(null,0.0,0.5);
var paint_up = hello.transform_painter.call(null,painter1,split_point,hello.make_vect.call(null,1.0,0.5),hello.make_vect.call(null,0.0,1.0));
var paint_down = hello.transform_painter.call(null,painter2,hello.make_vect.call(null,0.0,0.0),hello.make_vect.call(null,1.0,0.0),split_point);
return (function (frame){
paint_up.call(null,frame);
return paint_down.call(null,frame);
});
});
hello.wave_segments = cljs.core.list.call(null,hello.make_segment.call(null,hello.make_vect.call(null,0.0060,0.84),hello.make_vect.call(null,0.155,0.591)),hello.make_segment.call(null,hello.make_vect.call(null,0.0060,0.635),hello.make_vect.call(null,0.155,0.392)),hello.make_segment.call(null,hello.make_vect.call(null,0.304,0.646),hello.make_vect.call(null,0.155,0.591)),hello.make_segment.call(null,hello.make_vect.call(null,0.298,0.591),hello.make_vect.call(null,0.155,0.392)),hello.make_segment.call(null,hello.make_vect.call(null,0.304,0.646),hello.make_vect.call(null,0.403,0.646)),hello.make_segment.call(null,hello.make_vect.call(null,0.298,0.591),hello.make_vect.call(null,0.354,0.492)),hello.make_segment.call(null,hello.make_vect.call(null,0.403,0.646),hello.make_vect.call(null,0.348,0.845)),hello.make_segment.call(null,hello.make_vect.call(null,0.354,0.492),hello.make_vect.call(null,0.249,0.0)),hello.make_segment.call(null,hello.make_vect.call(null,0.403,0.0),hello.make_vect.call(null,0.502,0.293)),hello.make_segment.call(null,hello.make_vect.call(null,0.502,0.293),hello.make_vect.call(null,0.602,0.0)),hello.make_segment.call(null,hello.make_vect.call(null,0.348,0.845),hello.make_vect.call(null,0.403,0.999)),hello.make_segment.call(null,hello.make_vect.call(null,0.602,0.999),hello.make_vect.call(null,0.652,0.845)),hello.make_segment.call(null,hello.make_vect.call(null,0.652,0.845),hello.make_vect.call(null,0.602,0.646)),hello.make_segment.call(null,hello.make_vect.call(null,0.602,0.646),hello.make_vect.call(null,0.751,0.646)),hello.make_segment.call(null,hello.make_vect.call(null,0.751,0.646),hello.make_vect.call(null,0.999,0.343)),hello.make_segment.call(null,hello.make_vect.call(null,0.751,0.0),hello.make_vect.call(null,0.597,0.442)),hello.make_segment.call(null,hello.make_vect.call(null,0.597,0.442),hello.make_vect.call(null,0.999,0.144)));
