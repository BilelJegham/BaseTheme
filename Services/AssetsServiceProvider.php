<?php
/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file AssetsServiceProvider.php
 * @author Ambroise Maupate
 */
namespace Themes\BaseTheme\Services;

use Pimple\Container;
use Pimple\ServiceProviderInterface;

/**
 * Image formats.
 */
class AssetsServiceProvider implements ServiceProviderInterface
{
    /**
     * @param Container $container
     */
    public function register(Container $container)
    {
        $container['imageFormats'] = function ($c) {

            $array = [];

            $array['headerImage'] = [
                'width' => '1440',
                'progressive' => true,
                'class' => 'img-responsive',
            ];

            $array['columnedImage'] = [
                'width' => '720',
                'progressive' => true,
                'class' => 'img-responsive',
            ];

            $array['thumbnail'] = [
                'fit' => '600x338',
                'controls' => true,
                'embed' => true,
                'progressive' => true
            ];

            $array['shareImage'] = [
                'fit' => '1200x630',
                'quality' => 90,
                'absolute' => true,
                'progressive' => true,
            ];
            return $array;
        };

        return $container;
    }
}
