
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import { Button, MenuItem } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Select, IItemRendererProps } from "@blueprintjs/select";
const StringSelect = Select.ofType<string>();

import { 
    ACCESSORIZER_EYE_GUIDS,
    ACCESSORIZER_HAIR_GUIDS,
    ACCESSORIZER_HEAD_GUIDS,
    ACCESSORIZER_MOUTH_GUIDS,
    ACCESSORIZER_BODY_GUIDS
} from "oni-save-parser";


import DuplicantAccessoryPageProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";


type Props = DuplicantAccessoryPageProps & StateProps & DispatchProps;
class DuplicantAccessoryPage extends React.Component<Props> {
    render() {
        const {
            duplicantID,
            eyes,
            setEyes,

            hair,
            setHair,

            head,
            setHead,
            
            mouth,
            setMouth,

            body,
            setBody,
        } = this.props;

        return (
            <div className={`ui-duplicant-accessories fill-parent layout-vertical container-scroll`}>
                <AppearanceGroup name="Eyes" duplicantID={duplicantID} value={eyes} accessories={ACCESSORIZER_EYE_GUIDS} onSet={setEyes}/>
                <AppearanceGroup name="Head" duplicantID={duplicantID} value={head} accessories={ACCESSORIZER_HEAD_GUIDS} onSet={setHead}/>
                <AppearanceGroup name="Hair" duplicantID={duplicantID} value={hair} accessories={ACCESSORIZER_HAIR_GUIDS} onSet={setHair}/>
                <AppearanceGroup name="Mouth" duplicantID={duplicantID} value={mouth} accessories={ACCESSORIZER_MOUTH_GUIDS} onSet={setMouth}/>
                <AppearanceGroup name="Body" duplicantID={duplicantID} value={body} accessories={ACCESSORIZER_BODY_GUIDS} onSet={setBody}/>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DuplicantAccessoryPage);


interface AppearanceGroupProps {
    duplicantID: number;
    name: string;
    accessories: string[];
    value: string | null;
    onSet({duplicantID, accessoryID}: {duplicantID: number, accessoryID: string}): void
}
class AppearanceGroup extends React.Component<AppearanceGroupProps> {
    render() {
        const {
            name,
            accessories,
            value
        } = this.props;
        return (
            <div className="pt-form-group pt-inline">
            <label className="pt-label">
                {name}
            </label>
            <div className="pt-form-content">
                <StringSelect
                    items={accessories}
                    itemRenderer={this._renderItem}
                    onItemSelect={this._onSet}
                    filterable={false}
                    resetOnClose={true}
                    resetOnSelect={true}
                    popoverProps={{ minimal: true }}
                >
                    <Button rightIcon="caret-down" text={value || "[Accessory not Found]"} />
                </StringSelect>
            </div>
        </div>
        );
    }

    @autobind()
    private _renderItem(accessoryID: string, itemProps: IItemRendererProps) {
        const {
            modifiers,
            handleClick
        } = itemProps;

        if (!modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem
                active={modifiers.active}
                key={accessoryID}
                onClick={handleClick}
                text={accessoryID}
            />
        );
    };

    @autobind()
    private _onSet(accessoryID: string) {
        const {
            duplicantID,
            onSet
        } = this.props;
        onSet({duplicantID, accessoryID});
    }
}