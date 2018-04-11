<?php
namespace Craft;

return [
    'endpoints' => [
        'newsitem.json' => [
            'elementType' => ElementType::Entry,
            'criteria' => ['section' => 'news'],
            'transformer' => function(EntryModel $entry) {
                return [
                    'id' => $entry->id,
                    'title' => $entry->title,
                    'url' => $entry->url,
                    'slug' => $entry->slug,
                    'jsonUrl' => UrlHelper::getUrl("news/{$entry->id}.json"),
                    'body' => $entry->body->getRawContent(),
                    'date' => $entry->dateCreated->format(\DateTime::ATOM),
                ];
            },
        ],
        'newsitem/<slug:{slug}>.json' => function($slug) {
            return [
                'elementType' => ElementType::Entry,
                'criteria' => [
                    'section' => 'news',
                    'slug' => $slug
                ],
                'first' => true,
                'transformer' => function(EntryModel $entry) {
                    return [
                        'id' => $entry->id,
                        'title' => $entry->title,
                        'url' => $entry->url,
                        'slug' => $entry->slug,
                        'body' => $entry->body->getRawContent(),
                        'date' => $entry->dateCreated->format(\DateTime::ATOM),
                    ];
                },
                'jsonOptions' => JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES,
            ];
        },
    ]
];