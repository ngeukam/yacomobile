
import { View, Text } from 'react-native'
import React from 'react'

export default function PasswordValidation(input) {
    const [password, setPassword] = useState(''); 
    const [suggestions, setSuggestions] = useState([]); 
    const [strength, setStrength] = useState(''); 
    let newSuggestions = []; 
        if (input.length < 8) { 
            newSuggestions.push('Password should be at least 8 characters long') 
        } 
        if (!/\d/.test(input)) { 
            newSuggestions.push('Add at least one number') 
        } 
  
        if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) { 
            newSuggestions.push('Include both upper and lower case letters') 
        } 
  
        if (!/[^A-Za-z0-9]/.test(input)) { 
            newSuggestions.push('Include at least one special character') 
        } 
  
        setSuggestions(newSuggestions); 
  
        // Determine password strength based on suggestions 
        if (newSuggestions.length === 0) { 
            setStrength('Very Strong'); 
        } 
        else if (newSuggestions.length <= 1) { 
            setStrength('Strong') 
        } 
        else if (newSuggestions.length <= 2) { 
            setStrength('Moderate') 
        } 
        else if (newSuggestions.length <= 3) { 
            setStrength('Weak') 
        } 
        else { 
            setStrength('Too Weak') 
        } 
    
  return (
    <View>
      <Text>PasswordValidation</Text>
    </View>
  )
}