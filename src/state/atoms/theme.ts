import { atom } from 'recoil'


const themeAtom = atom<boolean>({
  key: 'Theme',
  default: true,
  effects: [
    ({setSelf, onSet}) => {
      const savedValue = localStorage.getItem('Theme')

      if (savedValue != undefined) {
        setSelf(JSON.parse(savedValue));
      }
    
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem('Theme')
          : localStorage.setItem('Theme', JSON.stringify(newValue));
      })
    }
  ]
})

export default themeAtom