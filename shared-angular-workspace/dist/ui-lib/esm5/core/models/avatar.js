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
}
var Avatar = /** @class */ (function () {
    function Avatar(options) {
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this[i] = options[i];
            }
        }
        if (this.first_name && this.last_name) {
            this.fullName = this.first_name.trim() + " " + this.last_name.trim();
        }
        else if (this.first_name || this.last_name) {
            this.fullName = (this.first_name) ? this.first_name.trim() : this.last_name.trim();
        }
    }
    return Avatar;
}());
export { Avatar };
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWktbGliLyIsInNvdXJjZXMiOlsiY29yZS9tb2RlbHMvYXZhdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxtQ0FRQzs7O0lBUEMsbUNBQW9COztJQUNwQixrQ0FBbUI7O0lBQ25CLDhCQUFlOztJQUNmLDZCQUFjOztJQUNkLDRCQUFhOztJQUNiLG1DQUFvQjs7SUFDcEIsa0NBQW1COztBQUdyQjtJQVVFLGdCQUFZLE9BQXVCO1FBQ2pDLEtBQUssSUFBTSxDQUFDLElBQUksT0FBTyxFQUFFO1lBQ3ZCLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QjtTQUNGO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxTQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFJLENBQUM7U0FDdEU7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BGO0lBQ0gsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDOzs7O0lBdEJDLDBCQUFpQjs7SUFDakIsNEJBQW1COztJQUNuQiwyQkFBa0I7O0lBQ2xCLHVCQUFjOztJQUNkLHNCQUFhOztJQUNiLDJCQUFrQjs7SUFDbEIsNEJBQW1COztJQUNuQixxQkFBWSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgQXZhdGFyT3B0aW9ucyB7XG4gIGZpcnN0X25hbWU/OiBzdHJpbmc7XG4gIGxhc3RfbmFtZT86IHN0cmluZztcbiAgaW1hZ2U/OiBzdHJpbmc7XG4gIHNsdWc/OiBzdHJpbmc7XG4gIGJpbz86IHN0cmluZztcbiAgcHVibGljX2tleT86IHN0cmluZztcbiAgdGh1bWJuYWlsPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQXZhdGFyIHtcbiAgZnVsbE5hbWU6IHN0cmluZztcbiAgZmlyc3RfbmFtZTogc3RyaW5nO1xuICBsYXN0X25hbWU6IHN0cmluZztcbiAgaW1hZ2U6IHN0cmluZztcbiAgc2x1Zzogc3RyaW5nO1xuICB0aHVtYm5haWw6IHN0cmluZztcbiAgcHVibGljX2tleTogc3RyaW5nO1xuICBiaW86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogQXZhdGFyT3B0aW9ucykge1xuICAgIGZvciAoY29uc3QgaSBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICB0aGlzW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5maXJzdF9uYW1lICYmIHRoaXMubGFzdF9uYW1lKSB7XG4gICAgICB0aGlzLmZ1bGxOYW1lID0gYCR7dGhpcy5maXJzdF9uYW1lLnRyaW0oKX0gJHt0aGlzLmxhc3RfbmFtZS50cmltKCl9YDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmlyc3RfbmFtZSB8fCB0aGlzLmxhc3RfbmFtZSkge1xuICAgICAgdGhpcy5mdWxsTmFtZSA9ICh0aGlzLmZpcnN0X25hbWUpID8gdGhpcy5maXJzdF9uYW1lLnRyaW0oKSA6IHRoaXMubGFzdF9uYW1lLnRyaW0oKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==