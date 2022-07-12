import { stripUndefined } from '../../src/util/util';

describe('util functions', () => {
  it('stripUndefined()', () => {
    expect(
      stripUndefined({
        foo: 1,
        bar: undefined,
        baz: 3
      })
    ).toEqual({ foo: 1, baz: 3 });

    expect(
      stripUndefined({
        bar: {
          baz: undefined
        },
        boo: {
          moo: {
            coo: 1
          },
          goo: undefined
        }
      })
    ).toEqual({
      bar: {},
      boo: {
        moo: {
          coo: 1
        }
      }
    });
  });
});
