//Start

import $ = require("jquery");
    
    $(() => {
        swatchModule.setConfig();

    });
    let swatchModule = (()=> {

        let $currentColor = $('.mainImage').attr('src');

        let options = {
            changeOnClick: true,
            changeOnHover: true
        };

        let swatchData = {
            color1: '#821564',
            color2: '#222a3d',
            color3: '#cfb82e',
            color4: '#e1472b',
            color5: '#c7a790',
            color6: '#ebebeb',
            color7: '#086cae',
            color8: '#1a1a1a'
        };

        function setOptionOnClick() {
            
            if( options.changeOnClick) {
                $('.click-btn').html('Click Off');
                options.changeOnClick = false;
            }
            else {
                $('.click-btn').html('Click On');
                options.changeOnClick = true;
            }
            swatchConfig();
        }

        function setOptionOnHover() {
            if( options.changeOnHover) {
                $('.hover-btn').html('Hover Off');
                options.changeOnHover = false;
            }
            else {
                $('.hover-btn').html('Hover On');
                options.changeOnHover = true;
            }
            swatchConfig();
        }

        function swatchConfig() {
            if (options.changeOnHover == true) {
                $('.color').mouseover(function() {
                    $('.mainImage').attr('src', ($(this).attr('data-image') + '.jpg'));
                }).mouseout(function() {
                    $('.mainImage').attr('src', $currentColor);
                });
            }
            if (options.changeOnHover == false) {
                $('.color').unbind('mouseover mouseout');
            }
            if (options.changeOnClick == true) {
                $('.color').on('click', function() {
                    $currentColor = $(this).attr('data-image') + '.jpg';
                    $('.mainImage').attr('src', ($(this).attr('data-image') + '.jpg'));
                });
            }
            if (options.changeOnClick == false) {
                $('.color').unbind('click');
            }
        }
        (function populateSwatches() {
            let fragment = document.createDocumentFragment();

            for (let item in swatchData) {
                var swatchBox = document.createElement('li');
                swatchBox.className = "color "+item;
                $(swatchBox).attr('data-image', 'images/'+item);
                $(swatchBox).css('background-color', swatchData[item]);
                $(fragment).append(swatchBox);
            }
            $('.colors-list').append(fragment); 
        })();

        return {
            setOnClick: setOptionOnClick,
            setOnHover: setOptionOnHover,
            setConfig: swatchConfig
        };

    })();


    //End