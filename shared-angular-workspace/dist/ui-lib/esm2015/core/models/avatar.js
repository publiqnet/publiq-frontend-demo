/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function AvatarOptions() { }
if (false) {
    /** @type {?|undefined} */
    AvatarOptions.prototype.first_name;
    /** @type {?|undefined} */
    AvatarOptions.prototype.last_name;
    /** @type {?|undefined} */
    AvatarOptions.prototype.image;
    /** @type {?|undefined} */
    AvatarOptions.prototype.slug;
    /** @type {?|undefined} */
    AvatarOptions.prototype.bio;
    /** @type {?|undefined} */
    AvatarOptions.prototype.public_key;
    /** @type {?|undefined} */
    AvatarOptions.prototype.thumbnail;
    /** @type {?|undefined} */
    AvatarOptions.prototype.subscribersCount;
    /** @type {?|undefined} */
    AvatarOptions.prototype.subscribed;
}
export class Avatar {
    /**
     * @param {?=} options
     */
    constructor(options) {
        for (const i in options) {
            if (options.hasOwnProperty(i)) {
                this[i] = options[i];
            }
        }
        if (this.first_name && this.last_name) {
            this.fullName = `${this.first_name.trim()} ${this.last_name.trim()}`;
        }
        else if (this.first_name || this.last_name) {
            this.fullName = (this.first_name) ? this.first_name.trim() : this.last_name.trim();
        }
    }
}
if (false) {
    /** @type {?} */
    Avatar.prototype.fullName;
    /** @type {?} */
    Avatar.prototype.first_name;
    /** @type {?} */
    Avatar.prototype.last_name;
    /** @type {?} */
    Avatar.prototype.image;
    /** @type {?} */
    Avatar.prototype.slug;
    /** @type {?} */
    Avatar.prototype.thumbnail;
    /** @type {?} */
    Avatar.prototype.public_key;
    /** @type {?} */
    Avatar.prototype.bio;
    /** @type {?} */
    Avatar.prototype.subscribersCount;
    /** @type {?} */
    Avatar.prototype.subscribed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWktbGliLyIsInNvdXJjZXMiOlsiY29yZS9tb2RlbHMvYXZhdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxtQ0FVQzs7O0lBVEMsbUNBQW9COztJQUNwQixrQ0FBbUI7O0lBQ25CLDhCQUFlOztJQUNmLDZCQUFjOztJQUNkLDRCQUFhOztJQUNiLG1DQUFvQjs7SUFDcEIsa0NBQW1COztJQUNuQix5Q0FBbUM7O0lBQ25DLG1DQUFxQjs7QUFHdkIsTUFBTSxPQUFPLE1BQU07Ozs7SUFZakIsWUFBWSxPQUF1QjtRQUNqQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRTtZQUN2QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEI7U0FDRjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztTQUN0RTthQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEY7SUFDSCxDQUFDO0NBQ0Y7OztJQXhCQywwQkFBaUI7O0lBQ2pCLDRCQUFtQjs7SUFDbkIsMkJBQWtCOztJQUNsQix1QkFBYzs7SUFDZCxzQkFBYTs7SUFDYiwyQkFBa0I7O0lBQ2xCLDRCQUFtQjs7SUFDbkIscUJBQVk7O0lBQ1osa0NBQWtDOztJQUNsQyw0QkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIEF2YXRhck9wdGlvbnMge1xuICBmaXJzdF9uYW1lPzogc3RyaW5nO1xuICBsYXN0X25hbWU/OiBzdHJpbmc7XG4gIGltYWdlPzogc3RyaW5nO1xuICBzbHVnPzogc3RyaW5nO1xuICBiaW8/OiBzdHJpbmc7XG4gIHB1YmxpY19rZXk/OiBzdHJpbmc7XG4gIHRodW1ibmFpbD86IHN0cmluZztcbiAgc3Vic2NyaWJlcnNDb3VudD86IG51bWJlciB8IHN0cmluZztcbiAgc3Vic2NyaWJlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBBdmF0YXIge1xuICBmdWxsTmFtZTogc3RyaW5nO1xuICBmaXJzdF9uYW1lOiBzdHJpbmc7XG4gIGxhc3RfbmFtZTogc3RyaW5nO1xuICBpbWFnZTogc3RyaW5nO1xuICBzbHVnOiBzdHJpbmc7XG4gIHRodW1ibmFpbDogc3RyaW5nO1xuICBwdWJsaWNfa2V5OiBzdHJpbmc7XG4gIGJpbzogc3RyaW5nO1xuICBzdWJzY3JpYmVyc0NvdW50OiBudW1iZXIgfCBzdHJpbmc7XG4gIHN1YnNjcmliZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IEF2YXRhck9wdGlvbnMpIHtcbiAgICBmb3IgKGNvbnN0IGkgaW4gb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdGhpc1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmlyc3RfbmFtZSAmJiB0aGlzLmxhc3RfbmFtZSkge1xuICAgICAgdGhpcy5mdWxsTmFtZSA9IGAke3RoaXMuZmlyc3RfbmFtZS50cmltKCl9ICR7dGhpcy5sYXN0X25hbWUudHJpbSgpfWA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZpcnN0X25hbWUgfHwgdGhpcy5sYXN0X25hbWUpIHtcbiAgICAgIHRoaXMuZnVsbE5hbWUgPSAodGhpcy5maXJzdF9uYW1lKSA/IHRoaXMuZmlyc3RfbmFtZS50cmltKCkgOiB0aGlzLmxhc3RfbmFtZS50cmltKCk7XG4gICAgfVxuICB9XG59XG4iXX0=