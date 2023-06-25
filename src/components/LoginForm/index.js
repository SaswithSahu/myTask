import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
    console.log(jwtToken)
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userDetails = {email, password}
    console.log(userDetails)
    const url = 'https://stage.api.sloovi.com/login?product=outreach'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (data.status === 'success') {
      this.onSubmitSuccess(data.results.token)
    } else {
      this.onSubmitFailure(data.message)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="email-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ4NFREWFhURFRUYHSggGBomGxMVITMhMSkrLi4uFx80QjQsRCgtNiwBCgoKDg0OFw8PFyseFR4rKysrKystLS0tOCsuNisvLSsrKy0rLS04ODgtLSsrKysrLSstLS0tLSsrLSsrKysrLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIGBwUDBP/EAEIQAAICAAIDCA4IBwEAAAAAAAABAgMEEQYHIQUSMUFRYXGTFiI0NVJUc3SBkaGxstITFBczQlPBwiMyQ2JyktGi/8QAGwEAAgMBAQEAAAAAAAAAAAAAAQIAAwQGBQf/xAA0EQACAQIBCQcDBAMBAAAAAAAAAQIDBBEFEhMhMTJBUXE0U4GRobHwFWHRIlLS4RQzwST/2gAMAwEAAhEDEQA/ANxACmaZ6RyqpvrwzSnCqbc+PfZZpJdPCNCDm8EZru7p2tPPqdEuLfJfMFxPXSfTvCYJyqhniMTHY6q2lGD5Jz4uhZvoM+3S083UvbSu+rwf4KEq3/vtl7SqJtvNvNt5tvhb5T0TyNEacUeLXvqs+Oavt+T7bMXdY87bZ2PlsslN+1hBHW3N0P3UxEVOOGnCD4JWTjTmuiT33pyOlHV/up+XV1sBs+K4mZ2txPXmN+f/AEr0Ee8Ed6OgW6f5dXWwPWOg26X5dfWwGVSHMplk+57t+Rw4I94I7MdCd0vAr6yB6x0M3R8CvrIj6WHMzyybd92/I5MESR2Fofuh4FfWR/6S7EN0PAr6yIdNDmUvJd53UvI5KJxOqtEsf4FfWRJdieP8CHWRDpqf7kVvJV53UvI5TEdbsTx/gQ6yIuxPdDwK+siTTQ/cgrJV53UvI5DIs7HYnuh4FfWRE9Et0PAr6yINNDmixZLu+6l5HGZFs7T0R3Q8CvrI/wDSL0R3R/Lr62IumhzLFky67uXkcVsi2dt6H7o/l19bEi9Dt0fy6+tiTSw5jLJt13b8jiMdd84vOE94+XfOL9h07tE9047fq8Z/421v2No5OMovoeV9NlL4FvoSSfQ3sYVOL2MWdtWpa5RlH74Nep1cHpRjqn99KyPgWpTz9L2lr3F0zouahflh7HsTct9XJ9P4fT6zON+mDEnSi+GBqt8oXFF72cuT1/2vmOJuQGa6JaVSolHD4mTlh3lGM3tdL4umPuNITTWa2p7U1wZGScHF4M6i1uoXEM6PiuXzh8RIAAQ0nF0k3Q+gpyi8rLM1HlSWWb9vtM/xNSnCdb4LIyi/Ssjt6U4pzxU4t9rVlGPq2/qcc9KhDNgubPn2WbuVe7lg/wBMHmrw2vxfpgULE4adU5QmspL1Ncq5jTtWmilca4boYmClbZ22HhJZxrr4rMvCfCuRZcpxsXha7VvbIKS4uVdD4UWjA6VSqrrq+rRcK4RrhvZOOUYrJLj4kV1aUsMIm/JuUrZSzrj9LWzU2seepN+hdwKj2ax8WfXL5Rdm0fFX1y+UzaCp+09763Y976S/iW8Cn9m8fFX1y+UOziPir65fKTQVORPrVj3vpL+JcAKd2cx8VfXL5Q7Oo+Kvrl8pNBU5E+s2Pe+kv4lxApnZ3HxV9evlF2eR8UfXr5SaCpyD9Zsu89JfxLoBSuz6Pij69fKHZ9HxOXXr5SaGpyJ9Ysu89JfxLqBSuz+PikuuXyi+0CPij69fKTQ1OQfq9n3npL8F2ApH2gx8TfXr5SP2hx8Tl16+UGhqcg/V7PvPSX4LyBRvtDj4nLr18ofaHHxOXXr5SaGfIn1az7z0l+C8gUX7RI+Jy69fKfRRp/hn97TbD/Fxn/wminyGjlS0epVF5Ne6LkedtcZxcZxjOL2OMkpRa50zl7naQ4PENRrvjv3sUJZwk3yLPh9B2BGmtTNkKkZxzoNNfbWUnSLQiuaduCyqs4XT/TnzRz/lfs6DP5qUJSrsjKE4NxnCS7aMlwpo3YpWsHcFW1PG0x/jURztS/qUrhb548PRnzF1Oq1qew8nKGToyi6tJYSW1c/76bTPGaLq+3ZdtUsJZLOdEVKtvhdTeW99Dy9DXIZvCWZ09wMd9XxmHubyjGaUv8Zdq/Y36i+cc6OB49lcOhWjLg9T6P8AG3wNoAAMGJ2eYzLsVbv7JT5X+uZ87Y2yJ7OzUfKJNybk9r1gRbGxMhBNkGNgwDITZBgxMgwMi2DE2AYTIsGRZBgZEbIsAyBkWDYNkGItiAADAAESDAAAAIi4aJ6VzrlHD4qe/qk1GFsnnKt8WbfCvcU8QsoqSwZotridCefTev0f2fzVtRvBGUU000mmsmntTXIcDQrdJ4jBV7552Ut1Tb4XlwP1NeplhPPksHgzuaNVVIRqR2NYmGbq4L6ti8RhuKqcow8m9sf/AC0eDO9rCrUd1LWvxwpm+neb39qOGboPGKZx13TUK04LYm/ItnZbZ4XtAqYC6KJd9Qr/ALjvsixkWzWcwDZBsk2QIEZBsbZFgHExMbItkGSE2QbJNkGAYbIMkyLAMgZBgxNkGExA2IAwAAECkRAAAEQAMg2AEQAgxeNWF3b4uvP+aNUkuhyT+Jeo0AzbVn3Vf5v++JpJhrb7OvyS8bSHj7syfWP3zfkaivIsOsfvk/I1FeRopbqPDyj2mfUYCAsMR3WxMbINl54wgYMgwDJAxMbIMgwNiYNkGAYGRYMTIMITBiYBhMTY2QAMAARINgAEJzyPB3gLFBs+oR5QszPQhMBiACEAQAQJcNWfdV/kH8cTSTNdWXdV/kP3xNKMNbffgdfkjsser92ZNrH75vyNXuZXSxayO+b8hX7mV5Ginuo8PKHaZ9RAADmI7jATE2XnkITIsbEyBExNg2RYBxMTEwZBiLBiIsAyBkWNkWyDAIAYAgeVk8gsnkLBYW3E3Qppg52TeSS4uVt8SXKBvAvp03J4LaRweEuxNsKKIOdknkkti523xJcpp2C0EwccJLD2pWXWZSniUspxsXBvOSK5OPjOjoxo9VgasllO6SX0tuWWf9seSKO6YqlVt6jrLHJ0aUcaixk/Jfb8vyMM3Z3HvwV7puXK4WJdpZDwl/ziPngzat2tyKcZS6blzwmv565+EjHsZhforbK1ONihOUVNbYTy40X0qmdq4njZSstBJSW49nPoeIDIlx5YCY5CAEuGrHuq/wAg/jiaUZrqx7qv83fxxNKMVbffgddknsser92ZNrI75vyFf6ldRYdZPfN+Qq/UriNFPdR4mUO0T6khAIsMOB3WyDBiZceSDItgxNgGBkGDBkGEyDYpyPmtuyA2WRg2fTviLZ8axB7xnmDEdwaPRsiAEADPKyeQ5zyI4PCXYm6FNMXOybySWzZxtviS5QN4F9Om5PBbR4PCXYm2FNMHOybySWzpbfElymuaMaPVYGrJZTuml9Lbllm/BjyRQaMaPVYGrJZTuml9Lbllm/BjyRR3TDUqZ2pbDrbDJ6oLPnv+3zi/BAAFP0n0hWUqaZbOCdifDzLm5xYQc3gjVd3dO2p58/BcW+S+ajz0q0h7WWHolseassXHzLm5+P30G57T6cRdmfJORvjBQWCOLuLqpczz5+C4JckQZEBMIgAAACXDVj3Vf5v++JpRmmrHuq/zf98TSzFW334HW5J7LHq/dmS6ye+b8hX7mVssmsnvm/IV+5lbNFLdR4mUO0T6jAQFhiO0xMbItlx5SQNkGxsgwDAyLZJkGAZHz3SLLodok8RKOKxSaw8XnCt7Hc1+33nzaMYHD3YuEcTLKG1whl2tj4ot8Sft4OM1iMUkkkkkskksklyIy154fpR0mR7GNRaWetJ4Yff7/jjt2baxpbopXjK1OpRrxNcUoNJKM4pbIS/R8RllldlU5V2xlCyD3soyWTTN8KzpboxDHQ38MoYmC7SfFNeDL9HxFVKrm6nsPSyjk9Vk6kN/3/v3MtjMU5nliKrKZyqtjKFkG4yjJZNM9MBhLsTbCmmDnZN5JLi5W3xJcpsztRy6ovOww1/9Hg8LbiboU0wc7JvJJbOlt8SXKa5oxo9VgasllO6aX0tuWTfJGPJFBoxo9VgasllO6aX0tuWTfJGPJFHdMVSpnalsOqsMnqgs+e/7fOL8EAAU7SbSFZSppls2qc0+Hm6OfjFhBzeCNV1dU7annz8Fxb5L5qDSbSFZSppls4JzT4ebo5+MpGIvzDEX5nyTmehGKgsEcVc3NS5qaSb6LglyXzWKczyGxEESEwAADAAhECkXHVj3Xf5u/igaWZpqw7rv83fxwNLMVbf8jrMk9lj1fuzI9ZPfOXkKvdIriLHrK75vyFf6lcRop7qPEygv/RPqMAAcxHYbE2DZBlx5YMixsiyDAwzIsWYBj3peTL/ozu/9Io03y/icEJv+pzPn5+MzuMz6qLshZ01NYM12d5UtamfHZxXBr5sfDzT2QCr6N6QKxRpvl/E4ITf9TmfP7y0HnTg4vBnb21zTuKekpvV6p8n8+6K3pZo1Xjob+O9hiILtJvgkvBlzc/Ee+jOj1WBqyjlO6aX0luXD/bHkijugTOeGHAZW9NVNLh+vn88sdoABTtJtIVlKimWzapzXHzdHPxhhBzeCEu7unbU8+fguLfJfNQaTaQrKVNMtm1TmuPmXNz8ZSMRe2GIvzPjnM9CEVBYI4q5ualzUz5vouCXJfNYTmebGyJCtIBAwAMAgEQYAAQAly1Yd13+bv44GlmaasO67/Nn8cDSzHW334HV5J7LHq/cyLWV30fkKvdIrhY9ZXfN+Qr/UraNFPdR4mUO0T6jAAHMZ12xMTEy48wTBiEwDITIsbIsgyDMnCZ5hmAJ9+HvyZfdGtIFYo03y/ibFCbf3nM+f3mbQmfZRfkCcFNYM02l1UtZ58NnFcGvmx8PNPZQKro1pCrFGm6Xb7FCxv7zmfI/eeGk2kKylTTLZwTsT4eZc3PxmHQyzs0615Ut1Q06f2w448v72Ya9g9JtIVlKmmWzgnNPh5ujn4yj4i/MMRe2fHOZuhFQWCOSubmpc1HOb6LglyXzWE5nmwEQrSATGIAwAAiBAQARjCABgCi4ar+67/Nn8cDTDM9V/dd/m7+OBphjrb7OryV2WPV+5kWsvvm/IV+4raLHrL76S8hV7pFbRop7qPEyh2ifUYCAcxHXIsGRZaeakBFsbZFsgwNkQYAGwAAIkGJEoTPMMyEwPrhc0Ky5s+XfCciYkzSc5nmAgDpAACYBgAAIQQhiIOAgABAGBEgxctV/dd/m7+OBphmWq/uvEebv44GmmOtvvwOqyV2WPV+5kOszvnLyFXukVtFk1md9H5Gn9xWkaKe6jw7/tE+owABzGdVkGe2Jq3k5wfDByz6U8jwZYYGmm09omRbG2IgQAAIEiAAAICGIgRkQAgwyIAAImAAQYBAIIQABChAYAQJEAGQYuGq/uu/zd/HA00zLVf3XiPN38cDTTHW334HU5K7LHq/cyDWZ30fkKf1K0iy6zO+j8hT+4rPEaKe6jxL/tE+pIRYuxa3k9rAmkjzE/wq37T7NMMJKrHXbO1skrY86ks37c16Dhs0jTvcl3YdXVrO3D5vJcMqm+29XD6zNRqUs6K+xnynbOjcy5S/UvH8MAAC0wARACBABAAICACDAIAIEBMGAAgIZEgUAAIAwAAyBAiAEGGAAAhcNV/deI83fxwNNM01XRf1rEPiVCT6XKOXuZpZkrb7OpyV2aPV+5jusmae6k0vw1UxfTvc/c0cncXAvE4rD4df1ZRjLmhwyf+qYtIcesTj8XiIvOFluUHy1xShF+lRTLvqy3FaU8dYst+nXQmuBZ9vL2Zf7F2ObA8nR/5V20t1vF9F8w8TQN5HwV6kBIDHgdTnMDONL9GHTKWJw8c6JPOcIr7p9HGvcaORaz2PamWQm4PFGO7tKd1DMn4Pl84riYaBoe72hVVrdmFapm9rrebqk+bLavd0FL3R3DxeHzd1M1GP4kvpI+tbDbCrGWzachc2Fe3bz44x5rWv68cDnAIY5kQhiEQZAMQiBATGRAEYAIgQEAEYwCAYAoAAiQKAYAAICGfXubDCSnvsXiI1URfbKKdltn9sYxTy9OSA3gPCDm8F86l91Z4Bww9uJksvrE4qGfgQz7b0ylL1EdYeksaKZYOmWeJvi42NcNNLW3Pkk1sXNt5M/gu0oxmJrjh9xMFZCuMVXG+UV2sVsSin2selt9BLcHV6999Puja7Zye/lTGbecntbnPhb6PWZnhnZ0vI6GLkqKoWyx1a5bF98Hxx17MfEr2huitmMmp2JwwkH28+B2tfhj+r4jYKaowhGEEowhFRjFLJRilkkgoqhCKhXGMIRSjGEUlGKXEkuA9RJzcmbLW1jbxwWuT2v5wAAAQ1AAAQgAAAY8N5GbaafeS9JURgb6O4jiMpdokRkAAWmETAAAMIAAhAIgAQoAABRhDACBIgAEGGAAAh8uK4DuaFfex6WAFc9jN9l/sj1Nph/KuhEgAxI62W0AAAigAAQh/9k="
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="data:image/jpeg;base64,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"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderEmailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
