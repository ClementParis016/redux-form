import expect from 'expect'
import { noop } from 'lodash'
import silenceEvents from '../silenceEvents'

describe('silenceEvents', () => {
  it('should return a function', () => {
    expect(silenceEvents()).toExist()
    expect(silenceEvents()).toBeA('function')
  })

  it('should return pass all args if first arg is not event', () => {
    const spy = expect.createSpy()
    const silenced = silenceEvents(spy)

    silenced(1, 2, 3)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(1, 2, 3)
    spy.restore()

    silenced('foo', 'bar')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('foo', 'bar')
    spy.restore()

    silenced({ value: 10 }, false)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith({ value: 10 }, false)
    spy.restore()
  })

  it('should return pass other args if first arg is event', () => {
    const spy = expect.createSpy()
    const silenced = silenceEvents(spy)
    const event = {
      preventDefault: noop,
      stopPropagation: noop
    }

    silenced(event, 1, 2, 3)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(1, 2, 3)
    spy.restore()

    silenced(event, 'foo', 'bar')
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('foo', 'bar')
    spy.restore()

    silenced(event, { value: 10 }, false)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith({ value: 10 }, false)
    spy.restore()
  })

  it('should silence event', () => {
    const spy = expect.createSpy()
    const preventDefault = expect.createSpy()
    const stopPropagation = expect.createSpy()
    const event = {
      preventDefault,
      stopPropagation
    }

    silenceEvents(spy)(event)
    expect(preventDefault).toHaveBeenCalled()
    expect(stopPropagation).toNotHaveBeenCalled()
    expect(spy).toHaveBeenCalled()
  })
})
