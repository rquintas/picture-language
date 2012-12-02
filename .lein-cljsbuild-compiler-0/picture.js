goog.provide('picture');
goog.require('cljs.core');
picture.make_vect = (function make_vect(x,y){
return cljs.core.list.call(null,x,y);
});
picture.xcor_vect = (function xcor_vect(v){
return cljs.core.first.call(null,v);
});
picture.ycor_vect = (function ycor_vect(v){
return cljs.core.last.call(null,v);
});
picture.add_vect = (function add_vect(v1,v2){
return picture.make_vect.call(null,(picture.xcor_vect.call(null,v1) + picture.xcor_vect.call(null,v2)),(picture.ycor_vect.call(null,v1) + picture.ycor_vect.call(null,v2)));
});
picture.sub_vect = (function sub_vect(v1,v2){
return picture.make_vect.call(null,(picture.xcor_vect.call(null,v1) - picture.xcor_vect.call(null,v2)),(picture.ycor_vect.call(null,v1) - picture.ycor_vect.call(null,v2)));
});
picture.scale_vect = (function scale_vect(s,v){
return picture.make_vect.call(null,(s * picture.xcor_vect.call(null,v)),(s * picture.ycor_vect.call(null,v)));
});
picture.make_frame = (function make_frame(origin,edge1,edge2){
return cljs.core.list.call(null,origin,cljs.core.list.call(null,edge1,edge2));
});
picture.origin_frame = (function origin_frame(frame){
return cljs.core.first.call(null,frame);
});
picture.edge1_frame = (function edge1_frame(frame){
return cljs.core.first.call(null,cljs.core.last.call(null,frame));
});
picture.edge2_frame = (function edge2_frame(frame){
return cljs.core.last.call(null,cljs.core.last.call(null,frame));
});
picture.frame_coord_map = (function frame_coord_map(frame){
return (function (v){
return picture.add_vect.call(null,picture.origin_frame.call(null,frame),picture.add_vect.call(null,picture.scale_vect.call(null,picture.xcor_vect.call(null,v),picture.edge1_frame.call(null,frame)),picture.scale_vect.call(null,picture.ycor_vect.call(null,v),picture.edge2_frame.call(null,frame))));
});
});
picture.make_segment = (function make_segment(v1,v2){
return cljs.core.list.call(null,v1,v2);
});
picture.start_segment = (function start_segment(segment){
return cljs.core.first.call(null,segment);
});
picture.end_segment = (function end_segment(segment){
return cljs.core.last.call(null,segment);
});
picture.draw_line = (function draw_line(v1,v2,graphics){
var line__6108 = graphics.append("svg:line");
return line__6108.attr("x1",picture.xcor_vect.call(null,v1)).attr("y1",picture.ycor_vect.call(null,v1)).attr("x2",picture.xcor_vect.call(null,v2)).attr("y2",picture.ycor_vect.call(null,v2)).style("stroke","rgb(6,120,155)");
});
goog.exportSymbol('picture.draw_line', picture.draw_line);
picture.draw_image = (function draw_image(frame,image,graphics){
return cljs.core.list.call(null,0);
});
picture.draw_as_group = (function draw_as_group(graphics,id){
return graphics.append("svg:g").attr("id",id);
});
picture.segments__GT_painter = (function segments__GT_painter(id,segment_list){
return (function (frame,g){
var graphics__6111 = picture.draw_as_group.call(null,g,id);
var segments__6112 = segment_list;
while(true){
if(cljs.core.empty_QMARK_.call(null,segments__6112))
{return segment_list;
} else
{picture.draw_line.call(null,picture.frame_coord_map.call(null,frame).call(null,picture.start_segment.call(null,cljs.core.first.call(null,segments__6112))),picture.frame_coord_map.call(null,frame).call(null,picture.end_segment.call(null,cljs.core.first.call(null,segments__6112))),graphics__6111);
{
var G__6113 = cljs.core.rest.call(null,segments__6112);
segments__6112 = G__6113;
continue;
}
}
break;
}
});
});
picture.image__GT_painter = (function image__GT_painter(image){
return (function (frame,graphics){
return picture.draw_image.call(null,frame,image,graphics);
});
});
picture.outline_painter = (function outline_painter(){
var segment_list__6115 = cljs.core.list.call(null,picture.make_segment.call(null,picture.make_vect.call(null,0,0),picture.make_vect.call(null,0,1)),picture.make_segment.call(null,picture.make_vect.call(null,0,0),picture.make_vect.call(null,1,0)),picture.make_segment.call(null,picture.make_vect.call(null,1,1),picture.make_vect.call(null,0,1)),picture.make_segment.call(null,picture.make_vect.call(null,1,0),picture.make_vect.call(null,1,1)));
return picture.segments__GT_painter.call(null,segment_list__6115);
});
picture.transform_painter = (function transform_painter(painter,origin,corner1,corner2,id){
return (function (frame,graphics){
var m__6118 = picture.frame_coord_map.call(null,frame);
var new_origin__6119 = m__6118.call(null,origin);
return painter.call(null,picture.make_frame.call(null,new_origin__6119,picture.sub_vect.call(null,m__6118.call(null,corner1),new_origin__6119),picture.sub_vect.call(null,m__6118.call(null,corner2),new_origin__6119)),picture.draw_as_group.call(null,graphics,id));
});
});
picture.flip_vert = (function flip_vert(id,painter){
return picture.transform_painter.call(null,painter,picture.make_vect.call(null,0,1),picture.make_vect.call(null,1,1),picture.make_vect.call(null,0,0),id);
});
picture.shrink_to_upper_right = (function shrink_to_upper_right(id,painter){
return picture.transform_painter.call(null,painter,picture.make_vect.call(null,0.5,0.5),picture.make_vect.call(null,1,0.5),picture.make_vect.call(null,0.5,1),id);
});
picture.rotate90 = (function rotate90(id,painter){
return picture.transform_painter.call(null,painter,picture.make_vect.call(null,1,0),picture.make_vect.call(null,1,1),picture.make_vect.call(null,0,0),id);
});
picture.squash_inwards = (function squash_inwards(id,painter){
return picture.transform_painter.call(null,painter,picture.make_vect.call(null,0,0),picture.make_vect.call(null,0.65,0.35),picture.make_vect.call(null,0.35,0.65),id);
});
picture.beside = (function beside(id,painter1,painter2){
var split_point__6124 = picture.make_vect.call(null,0.5,0.0);
var paint_left__6125 = picture.transform_painter.call(null,painter1,picture.make_vect.call(null,0,0),split_point__6124,picture.make_vect.call(null,0.0,1.0),id);
var paint_right__6126 = picture.transform_painter.call(null,painter2,split_point__6124,picture.make_vect.call(null,1.0,0),picture.make_vect.call(null,0.5,1.0),id);
return (function (frame,graphics){
var group__6127 = picture.draw_as_group.call(null,graphics,id);
paint_left__6125.call(null,frame,group__6127);
return paint_right__6126.call(null,frame,group__6127);
});
});
picture.below = (function below(id,painter1,painter2){
var split_point__6132 = picture.make_vect.call(null,0.0,0.5);
var paint_up__6133 = picture.transform_painter.call(null,painter1,split_point__6132,picture.make_vect.call(null,1.0,0.5),picture.make_vect.call(null,0.0,1.0),id);
var paint_down__6134 = picture.transform_painter.call(null,painter2,picture.make_vect.call(null,0.0,0.0),picture.make_vect.call(null,1.0,0.0),split_point__6132,id);
return (function (frame,graphics){
var group__6135 = picture.draw_as_group.call(null,graphics,id);
paint_up__6133.call(null,frame,group__6135);
return paint_down__6134.call(null,frame,group__6135);
});
});
picture.wave_segments = cljs.core.list.call(null,picture.make_segment.call(null,picture.make_vect.call(null,0.0060,0.84),picture.make_vect.call(null,0.155,0.591)),picture.make_segment.call(null,picture.make_vect.call(null,0.0060,0.635),picture.make_vect.call(null,0.155,0.392)),picture.make_segment.call(null,picture.make_vect.call(null,0.304,0.646),picture.make_vect.call(null,0.155,0.591)),picture.make_segment.call(null,picture.make_vect.call(null,0.298,0.591),picture.make_vect.call(null,0.155,0.392)),picture.make_segment.call(null,picture.make_vect.call(null,0.304,0.646),picture.make_vect.call(null,0.403,0.646)),picture.make_segment.call(null,picture.make_vect.call(null,0.298,0.591),picture.make_vect.call(null,0.354,0.492)),picture.make_segment.call(null,picture.make_vect.call(null,0.403,0.646),picture.make_vect.call(null,0.348,0.845)),picture.make_segment.call(null,picture.make_vect.call(null,0.354,0.492),picture.make_vect.call(null,0.249,0.0)),picture.make_segment.call(null,picture.make_vect.call(null,0.403,0.0),picture.make_vect.call(null,0.502,0.293)),picture.make_segment.call(null,picture.make_vect.call(null,0.502,0.293),picture.make_vect.call(null,0.602,0.0)),picture.make_segment.call(null,picture.make_vect.call(null,0.348,0.845),picture.make_vect.call(null,0.403,0.999)),picture.make_segment.call(null,picture.make_vect.call(null,0.602,0.999),picture.make_vect.call(null,0.652,0.845)),picture.make_segment.call(null,picture.make_vect.call(null,0.652,0.845),picture.make_vect.call(null,0.602,0.646)),picture.make_segment.call(null,picture.make_vect.call(null,0.602,0.646),picture.make_vect.call(null,0.751,0.646)),picture.make_segment.call(null,picture.make_vect.call(null,0.751,0.646),picture.make_vect.call(null,0.999,0.343)),picture.make_segment.call(null,picture.make_vect.call(null,0.751,0.0),picture.make_vect.call(null,0.597,0.442)),picture.make_segment.call(null,picture.make_vect.call(null,0.597,0.442),picture.make_vect.call(null,0.999,0.144)));
