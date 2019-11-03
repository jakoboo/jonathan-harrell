import React from 'react'
import styled from 'styled-components'

const Root = styled.input`
  height: 3rem;
  padding: 0 ${({ theme }) => theme.spacing.m};
  border: 0;
  background-color: var(--backgroundSecondary);
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: ${({ theme }) => theme.fontSizes.m.mobile};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.m.tablet};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.m.desktop};
  }
`

const Input = ({ children, type, ...props }) => (
  <Root type={type} {...props}>
    {children}
  </Root>
)

export default Input