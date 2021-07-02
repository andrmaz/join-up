import type {ContainerPropsType} from 'app/types/container'

const Wrapper = ({children}: ContainerPropsType): JSX.Element => (
  <section className='h-full py-12 px-24 xl:px-40'>{children}</section>
)

export default Wrapper
