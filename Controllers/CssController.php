<?php
declare(strict_types=1);
/**
 * Copyright (c) 2017. Rezo Zero
 *
 * BaseTheme
 *
 * @file CssController.php
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
namespace Themes\BaseTheme\Controllers;

use RZ\Roadiz\Core\Entities\Node;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Themes\BaseTheme\BaseThemeApp;

/**
 * Class CssController
 * @package Themes\BaseTheme\Controllers
 */
class CssController extends BaseThemeApp
{
    const CSS_CACHE_ID = "dynamic_styles";

    /**
     * @param Request     $request
     * @param string|null $_locale
     *
     * @return Response
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function stylesAction(
        Request $request,
        $_locale = null
    ) {
        $translation = $this->bindLocaleFromRoute($request, $_locale);
        $this->prepareThemeAssignation(null, $translation);

        // Pages
        $this->assignation['pages'] = $this->getPages();

        $response = new Response();
        $response->setStatusCode(Response::HTTP_OK);
        $response->headers->set('Content-Type', 'text/css');

        $response->setContent($this->getTwig()->render('css/dynamic-styles.css.twig', $this->assignation));
        $this->makeResponseCachable($request, $response, 60);

        return $response;
    }

    /**
     * @return Node[]
     */
    protected function getPages()
    {
        $pages = $this->get('nodeSourceApi')
            ->getBy([
                'node.nodeType' => $this->get('nodeTypesBag')->get('Page'),
                'translation' => $this->translation
            ]);

        return $pages;
    }
}
