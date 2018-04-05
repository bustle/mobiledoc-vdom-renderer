import Mobiledoc from '../types/Mobiledoc'

/* TODO:
  actually just build this mobiledoc in each index.test.js, from the examples in
  each renderer’s subtests!
*/

export default {
  version: '0.3.1',
  cards: [['image-card', {}], ['video-card', {}]],
  markups: [
    ['b'], // Markup at index 0
    ['a', ['href', 'https://www.example.com/']] // Markup at index 1
  ],
  atoms: [
    ['mention', '@bob', { id: 42 }], // mention Atom at index 0
    ['mention', '@tom', { id: 12 }] // mention Atom at index 1
  ],
  sections: [
    [
      1,
      'p',
      [
        [0, [], 0, 'Example with no markup'], // textTypeIdentifier for markup is always 0
        [
          0,
          [0],
          1,
          'Example wrapped in `b` tag (opened markup #0), 1 closed markup'
        ],
        [
          0,
          [1],
          0,
          'Example opening `a` tag (opened markup with #1, 0 closed markups)'
        ],
        [
          0,
          [],
          1,
          'Example closing `a` tag (no opened markups, 1 closed markup)'
        ],
        [
          0,
          [1, 0],
          1,
          'Example opening `a` tag and `b` tag, closing `b` tag (opened markups #1 and #0, 1 closed markup [closes markup #0])'
        ],
        [
          0,
          [],
          1,
          'Example closing `a` tag, (no opened markups, 1 closed markup [closes markup #1])'
        ]
      ]
    ],
    [
      1,
      'p',
      [
        [1, [], 0, 0], // mention atom at index 0 (@bob), textTypeIdentifier for atom is always 1
        [1, [0], 1, 1] // mention atom at index 1 (@tom) wrapped in `b` tag (markup index 0)
      ]
    ]
  ]
} as Mobiledoc
