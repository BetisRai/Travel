import RoutesCard from '../components/routesCard'

const ListAvailable = () => {
    return (
        <div>
            <RoutesCard
                arrivalPlace={"Kathmandu"}
                depaturePlace={"Belbari"}
                busLogo='Logo'
                busName='Shakira'
                busNumber='00000'
                price='5000'
                type='non-stop'
                arrivalTime={new Date(new Date().getTime() + 10000000).toLocaleDateString()}
                depatureTime={new Date().toLocaleDateString()}
            />
        </div>
    )
}

export default ListAvailable