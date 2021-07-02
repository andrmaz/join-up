import type {ContainerPropsType} from 'app/types/container'

const Container = ({children}: ContainerPropsType): JSX.Element => (
  <section className='h-min-screen pt-20'>{children}</section>
)

export default Container
