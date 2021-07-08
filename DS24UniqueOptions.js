;(function ($) {
    'use strict';

    /**
     * Register plugin
     *
     * This plugin handles validation and addition logic for the registration form and its fields.
     */
    $.plugin('DS24UniqueOptions', {
        init: function () {
            var me = this,
                $el = me.$el;
            me.applyDataAttributes();
            var options = $el.find("#test_select li");
            var maximum_lengths=[];
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                for (var j = 0; j < option.children.length; j++) {
                    var suboption = option.children[j];
                    if(j+1>maximum_lengths.length){
                        if(suboption.classList.contains("main_option_without_x")){
                            maximum_lengths.push(suboption.offsetWidth);
                        } else{
                            maximum_lengths.push([suboption.offsetWidth,suboption.children[0].offsetWidth,suboption.children[1].offsetWidth]);
                        }
                    } else {
                        if(suboption.classList.contains("main_option_without_x")){
                            if(Array.isArray(maximum_lengths[j])){
                                var current_max_array = maximum_lengths[j];
                                current_max_array[0] = Math.max(current_max_array[0],suboption.offsetWidth);
                                maximum_lengths[j] = current_max_array;
                            } else
                            {
                                maximum_lengths[j] = Math.max(suboption.offsetWidth, maximum_lengths[j]);
                            }
                        } else {
                            if(Array.isArray(maximum_lengths[j])){
                                var current_max_array = maximum_lengths[j];
                                current_max_array[0] = Math.max(current_max_array[0],suboption.offsetWidth);
                                current_max_array[1] = Math.max(current_max_array[1],suboption.children[0].offsetWidth);
                                current_max_array[2] = Math.max(current_max_array[2],suboption.children[1].offsetWidth);
                                maximum_lengths[j] = current_max_array;
                            } else {
                                var current_max_array = [];
                                current_max_array.push(Math.max(maximum_lengths[j],suboption.offsetWidth));
                                current_max_array.push(suboption.children[0].offsetWidth);
                                current_max_array.push(suboption.children[1].offsetWidth);
                                maximum_lengths[j] = current_max_array;
                            }
                        }
                    }
                }

                }
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                for (var j = 0; j < option.children.length; j++) {
                    var suboption = option.children[j];
                    if(suboption.classList.contains("main_option_without_x")){
                        if(Array.isArray(maximum_lengths[j])){
                            suboption.style.width = String(maximum_lengths[j][0]).concat("px");
                        } else {
                            suboption.style.width = String(maximum_lengths[j]).concat("px");
                        }
                    } else{
                        suboption.style.width = String(maximum_lengths[j][0]).concat("px");
                        suboption.children[0].style.width = String(maximum_lengths[j][1]).concat("px");
                        suboption.children[1].style.width = String(maximum_lengths[j][2]).concat("px");
                    }
                }
                option.classList.add("is_visible");
            }
            console.log(maximum_lengths);
            var options = document.getElementById('test_select').children;
}
})})
    (jQuery);
