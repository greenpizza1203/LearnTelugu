import {Text, TextProps} from "react-native";
export default function (props: TextProps) {

    // if (!props.style) props.style = [];

    props.style = [props.style, {fontFamily:'Nirmala'}]
    return <Text {...props}/>
}
