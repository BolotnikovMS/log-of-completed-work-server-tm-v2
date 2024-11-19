import { transliterate } from '#helpers/transliterate'
import { test } from '@japa/runner'

test.group('Helpers transliterate', () => {
  test('Проверка на перевод текста в транслит')
    .with([
      { text: 'Кулаево', result: 'Kulaevo' },
      { text: 'Хлеб', result: 'Hleb' },
      { text: 'море', result: 'more' },
      { text: 'Zemlya', result: 'Zemlya' },
    ])
    .run(({ assert }, item) => {
      assert.isString(item.text)
      assert.equal(transliterate(item.text), item.result)
    })
})
