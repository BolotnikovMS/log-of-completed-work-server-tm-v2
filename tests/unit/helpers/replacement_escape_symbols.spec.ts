import { replacementEscapeSymbols } from '#shared/helpers/replacement_escape_symbols'
import { test } from '@japa/runner'

test.group('Helpers replacement escape symbols', () => {
  test('Проверка на замену экранированных символов в строке')
    .with([
      { text: '&quot;Test&quot;', result: '"Test"' },
      { text: 'And&amp;', result: 'And&' },
      { text: '2&lt;1', result: '2<1' },
      { text: 'TestClear', result: 'TestClear' },
      { text: '', result: '' },
      { text: null, result: null },
    ])
    .run(({ assert }, item) => {
      // console.log(`Значение ${item.text} = ${item.result}`)
      assert.equal(replacementEscapeSymbols(item.text), item.result, `Value: ${item.text}`)
    })
})
