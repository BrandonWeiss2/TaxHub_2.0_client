// navButtonsArr contains all the nav button layouts for each route
const navButtonsArr = [
  [
    {
      name: 'Dashboard',
      handleClick: function () {
          this.props.history.push('Dashboard')
        } 
    },
    {
      name: 'Clients',
      handleClick: function () {
          this.props.history.push('Clients')
        }
    },
    {
      name: 'Search',
      handleClick: function () {
          this.props.history.push('Search')
        }
    },
    {
      name: 'Reminders',
      handleClick: function () {
          this.props.history.push('Reminders')
        }
    },
  ],
]

export { navButtonsArr }